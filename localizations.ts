// localization.ts
import { ptBR } from "@clerk/localizations";

interface Localization {
  [key: string]: any;
}

// Função de mesclagem
function mergeLocalizations(
  customLocalization: Localization,
  defaultLocalization: Localization
): Localization {
  const result: Localization = { ...defaultLocalization };

  for (const key in customLocalization) {
    if (
      typeof customLocalization[key] === "object" &&
      customLocalization[key] !== null
    ) {
      result[key] = mergeLocalizations(
        customLocalization[key],
        defaultLocalization[key]
      );
    } else {
      result[key] = customLocalization[key];
    }
  }

  return result;
}

// Traduções personalizadas
const customLocalization: Localization = {
  signUp: {
    start: {
      title: "Crie a sua conta",
      subtitle: "para acessar o {{applicationName}}",
      actionText: "Já tem uma conta?",
      actionLink: "Faça login",
    },
    emailLink: {
      title: "Verifique o seu email",
      subtitle: "para acessar o {{applicationName}}",
      formTitle: "Link de verificação",
      formSubtitle: "Use link de verificação enviado pelo seu email",
      resendButton: "Não recebeu o link? Enviar novamente",
      verified: {
        title: "Cadastro feito com sucesso",
      },
      loading: {
        title: "Entrando...",
      },
      verifiedSwitchTab: {
        title: "Email verificado com sucesso",
        subtitle: "Retorne a última aba para continuar",
        subtitleNewTab: "Retorne a última aba para continuar",
      },
    },
    emailCode: {
      title: "Verifique o seu email",
      subtitle: "para acessar o {{applicationName}}",
      formTitle: "Codigo de verificacao",
      formSubtitle: "Adicione o codigo de verificacao enviado para o seu email",
      resendButton: "Nao recebeu o codigo? Reenviar",
    },
    phoneCode: {
      title: "Verifique o seu telefone",
      subtitle: "para acessar o {{applicationName}}",
      formTitle: "Codigo de verificacao",
      formSubtitle: "Adicione o codigo de verificacao enviado para o seu email",
      resendButton: "Nao recebeu o codigo? Reenviar",
    },
    continue: {
      title: "Preencha todos os campos",
      subtitle: "para acessar o {{applicationName}}",
      actionText: "Já tem uma conta?",
      actionLink: "Faça login",
    },
  },
  signIn: {
    start: {
      title: "Entre na sua conta",
      subtitle: "para acessar o {{applicationName}}",
      actionText: "Nao tem uma conta?",
      actionLink: "Criar conta ",
    },
  },
};

const mergedLocalization = mergeLocalizations(customLocalization, ptBR);

export { mergedLocalization };
