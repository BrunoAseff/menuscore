import { GetFormStats } from "@/actions/form";
import { GetForms } from "@/actions/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ReactNode, Suspense } from "react";
import { LuView } from "react-icons/lu";
import { FaWpforms } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { TbArrowBounce } from "react-icons/tb";
import { Separator } from "@/components/ui/separator";
import CreateFormBtn from "@/components/CreateFormBtn";
import { Form } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { formatDistance } from "date-fns";
import { pt } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BiRightArrowAlt } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";

export default function Home() {
  return (
    <div className="container pt-4 ">
      <Suspense fallback={<StatsCards loading={true} />}>
        <CardStatsWrapper />
      </Suspense>
      <Separator className="my-6" />
      <h2 className="text-4xl font-bold  col-span-2 ">Seus formulários</h2>
      <Separator className="my-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CreateFormBtn />
        <Suspense
          fallback={[1, 2, 3, 4].map((el) => (
            <FormCardSkeleton key={el} />
          ))}
        >
          <FormCards />
        </Suspense>
      </div>
    </div>
  );
}

async function CardStatsWrapper() {
  const stats = await GetFormStats();
  return <StatsCards loading={false} data={stats} />;
}

interface StatsCardsProps {
  data?: Awaited<ReturnType<typeof GetFormStats>>;
  loading: boolean;
}

function StatsCards(props: StatsCardsProps) {
  const { data, loading } = props;

  return (
    <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total de visitas"
        icon={<LuView className="text-secondary scale-150" />}
        helperText="Quantidade de visitas ao formulário."
        value={data?.visits.toLocaleString() || ""}
        loading={loading}
        className=" bg-card cursor-pointer"
      />
      <StatsCard
        title="Total de respostas"
        icon={<FaWpforms className="text-secondary scale-150" />}
        helperText="Quantidade de vezes que o formulário foi respondido."
        value={data?.submissions.toLocaleString() || ""}
        loading={loading}
        className=" bg-card cursor-pointer"
      />

      <StatsCard
        title="Taxa de respostas"
        icon={<HiCursorClick className="text-secondary scale-150" />}
        helperText="Porcentagem de visitas que se transformaram em respostas."
        value={data?.submissionRate.toLocaleString() + "%" || ""}
        loading={loading}
        className=" bg-card cursor-pointer"
      />

      <StatsCard
        title="Taxa de rejeição"
        icon={<TbArrowBounce className="text-secondary scale-150" />}
        helperText="Porcentagem de visitas que saíram sem responder."
        value={data?.submissionRate.toLocaleString() + "%" || ""}
        loading={loading}
        className=" bg-card cursor-pointer"
      />
    </div>
  );
}

export function StatsCard({
  title,
  value,
  icon,
  helperText,
  loading,
  className,
}: {
  title: string;
  value: string;
  helperText: string;
  className: string;
  loading: boolean;
  icon: ReactNode;
}) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {loading && (
            <Skeleton>
              <span className="opacity-0">0</span>
            </Skeleton>
          )}
          {!loading && value}
        </div>
        <p className="text-xs text-muted-foreground pt-1 ">{helperText}</p>
      </CardContent>
    </Card>
  );
}

function FormCardSkeleton() {
  return <Skeleton className="border-2 border-primary-/20 h-[190px] w-full" />;
}

async function FormCards() {
  const forms = await GetForms();
  return (
    <>
      {forms.map((form) => (
        <FormCard key={form.id} form={form} />
      ))}
    </>
  );
}

function FormCard({ form }: { form: Form }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 justify-between">
          <span className="truncate ">{form.name}</span>
          {form.published && (
            <Badge className="bg-emerald-200 text-emerald-950   dark:text-emerald-200 dark:bg-emerald-950	">
              Público
            </Badge>
          )}
          {!form.published && <Badge variant={"destructive"}>Privado</Badge>}
        </CardTitle>
        <CardDescription className="flex items-center justify-between text-muted-foreground text-sm">
          {formatDistance(form.createdAt, new Date(), {
            addSuffix: true,
            locale: pt,
          })}
          {form.published && (
            <span className="flex items-center gap-2">
              <LuView className="text-secondary" />
              <span>{form.visits.toLocaleString()}</span>
              <FaWpforms className="text-secondary" />
              <span>{form.submissions.toLocaleString()}</span>
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[20px] truncate text-sm text-muted-foreground">
        {form.description || "Sem descrição"}
      </CardContent>
      <CardFooter>
        {form.published && (
          <Button asChild className="w-full mt-2  gap-4">
            <Link href={`/forms/${form.id}`}>
              Ver respostas <BiRightArrowAlt />
            </Link>
          </Button>
        )}

        {!form.published && (
          <Button
            asChild
            className="w-full mt-2 bg-primary rounded-xl	 gap-4 hover:bg-secondary "
          >
            <Link href={`/builder/${form.id}`}>
              Editar formulário <FaEdit />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
