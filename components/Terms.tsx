import React from "react";
import { ScrollView, StyleSheet, Text, View, ViewStyle } from "react-native";

export default function Terms({style}: {style?: ViewStyle}) {
  return (
    <View style={[style]}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator>
        <Text style={styles.title}>TERMO DE USO – Caminho da Roça</Text>

        <Text style={styles.paragraph}>
          A seguir estão descritas as regras aplicáveis à utilização do aplicativo Caminho da Roça, disponibilizado pelo SERVIÇO NACIONAL DE APRENDIZAGEM RURAL – SENAR Rio, sediado na Avenida Rio Branco, 135, Centro, Rio de Janeiro, RJ, inscrito no CNPJ nº 04.321.101/0001-15 (doravante “SENAR Rio”), em dispositivos móveis com sistemas Android e iOS.
        </Text>

        <Text style={styles.paragraph}>
          Ao utilizar o aplicativo, o usuário submete-se automaticamente às regras e condições deste Termo de Uso.
        </Text>

        <Text style={styles.sectionTitle}>1. Do Objeto</Text>
        <Text style={styles.paragraph}>
          O Caminho da Roça é um aplicativo do SENAR Rio que conecta turistas a propriedades e/ou negócios rurais no estado do Rio de Janeiro. A plataforma caracteriza-se pela prestação dos seguintes serviços:
        </Text>
        <Text style={styles.listItem}>• Divulgação de propriedades rurais voltadas ao turismo rural;</Text>
        <Text style={styles.listItem}>• Geolocalização para ajudar turistas a encontrarem propriedades próximas;</Text>
        <Text style={styles.listItem}>• Busca rápida e filtros (ex.: acessibilidade, pet friendly, região, tipo de atividade);</Text>
        <Text style={styles.listItem}>• Disponibilização de informações básicas sobre as propriedades (descrição, fotos, contatos, atrativos, etc.);</Text>
        <Text style={styles.listItem}>• Promoção do turismo rural fluminense, aproximando turistas e propriedades.</Text>
        <Text style={styles.paragraph}>
          O Caminho da Roça não realiza intermediação comercial, reservas, hospedagens ou pagamentos. A relação contratual ocorre diretamente entre turista e propriedade rural.
        </Text>

        <Text style={styles.sectionTitle}>2. Da Aceitação</Text>
        <Text style={styles.paragraph}>
          O presente Termo estabelece obrigações de livre e espontânea vontade, por tempo indeterminado, entre a plataforma e os usuários do aplicativo. Ao utilizar a plataforma, o usuário aceita integralmente as presentes normas e compromete-se a observá-las, sob pena de aplicação das medidas cabíveis. Caso não concorde com as disposições deste Termo, o usuário não deve utilizar a plataforma.
        </Text>

        <Text style={styles.sectionTitle}>3. Do Acesso dos Usuários</Text>
        <Text style={styles.paragraph}>
          O Caminho da Roça se compromete a utilizar todas as soluções técnicas disponíveis para manter o acesso à plataforma de forma contínua, 24 (vinte e quatro) horas por dia, 7 (sete) dias por semana. No entanto, a navegação poderá ser interrompida, limitada ou suspensa sempre que forem necessárias atualizações, ajustes, manutenções ou outras ações para garantir o bom funcionamento do serviço.
        </Text>

        <Text style={styles.sectionTitle}>4. Do Cadastro</Text>
        <Text style={styles.listItem}>• O usuário deverá informar dados completos, atuais e válidos, sendo de sua exclusiva responsabilidade mantê-los atualizados.</Text>
        <Text style={styles.listItem}>• O usuário se compromete a não compartilhar seus dados de acesso com terceiros, responsabilizando-se pelo uso indevido que deles possa ser feito.</Text>
        <Text style={styles.listItem}>• Menores de 18 anos ou pessoas sem plena capacidade civil deverão obter o consentimento expresso de seus responsáveis legais para utilizar a plataforma.</Text>
        <Text style={styles.listItem}>• Após o cadastro, o usuário terá um login e senha pessoais, que devem ser mantidos em sigilo.</Text>
        <Text style={styles.listItem}>• É vedada a cessão, venda, aluguel ou transferência da conta a terceiros.</Text>
        <Text style={styles.listItem}>• O usuário poderá, a qualquer momento, requerer o cancelamento de seu cadastro, que será processado no menor prazo possível.</Text>
        <Text style={styles.listItem}>• Ao aceitar este Termo e a Política de Privacidade, o usuário autoriza a coleta, uso e tratamento das informações fornecidas, conforme disposto na Política de Privacidade.</Text>

        <Text style={styles.sectionTitle}>5. Do Cancelamento</Text>
        <Text style={styles.paragraph}>
          O usuário poderá cancelar seu cadastro a qualquer momento. O serviço poderá ser cancelado:
        </Text>
        <Text style={styles.listItem}>a) Pelo usuário – com cessação em até 48 (quarenta e oito) horas úteis;</Text>
        <Text style={styles.listItem}>b) Por violação dos Termos de Uso – com cessação imediata.</Text>

        <Text style={styles.sectionTitle}>6. Do Suporte</Text>
        <Text style={styles.paragraph}>
          Em caso de dúvidas, sugestões ou problemas, o usuário poderá entrar em contato pelo e-mail contato@caminhodaroca.app.br ou telefone (21) 97635-0270. O atendimento estará disponível de segunda a sexta-feira, em dias úteis, das 9h às 17h.
        </Text>

        <Text style={styles.sectionTitle}>7. Das Responsabilidades</Text>
        <Text style={styles.subSectionTitle}>Do Usuário:</Text>
        <Text style={styles.listItem}>a) Responder por falhas ou defeitos originados em seus próprios dispositivos;</Text>
        <Text style={styles.listItem}>b) Utilizar a plataforma de forma adequada, com respeito e cordialidade;</Text>
        <Text style={styles.listItem}>c) Cumprir as regras deste Termo, da Política de Privacidade e da legislação aplicável;</Text>
        <Text style={styles.listItem}>d) Manter seus dados de acesso (login e senha) sob sigilo;</Text>
        <Text style={styles.listItem}>e) Responsabilizar-se pela veracidade dos dados preenchidos, comprometendo-se a assumir eventuais consequências legais caso as informações fornecidas sejam falsas ou imprecisas.</Text>

        <Text style={styles.subSectionTitle}>Da Plataforma Caminho da Roça:</Text>
        <Text style={styles.listItem}>a) Disponibilizar informações corretas e atualizadas sobre suas funcionalidades;</Text>
        <Text style={styles.listItem}>b) Corrigir falhas técnicas sob sua responsabilidade;</Text>
        <Text style={styles.listItem}>c) Responder apenas pelas informações oficiais divulgadas, não se responsabilizando por conteúdos publicados por usuários;</Text>
        <Text style={styles.listItem}>d) Adotar medidas para coibir atividades ilícitas quando delas tiver conhecimento.</Text>

        <Text style={styles.sectionTitle}>8. Dos Direitos Autorais</Text>
        <Text style={styles.paragraph}>
          O presente Termo concede aos usuários uma licença não exclusiva, intransferível e não sublicenciável para uso da plataforma. A estrutura do aplicativo, marcas, logotipos, nomes comerciais, layouts, design, conteúdos escritos, imagens, vídeos, sons, programas de computador e demais direitos de propriedade intelectual pertencem ao SENAR Rio, nos termos da legislação vigente. O uso da plataforma é pessoal e intransferível, sendo vedado qualquer uso não autorizado, comercial ou não-comercial.
        </Text>

        <Text style={styles.sectionTitle}>9. Das Sanções</Text>
        <Text style={styles.paragraph}>
          Sem prejuízo das demais medidas legais, o SENAR Rio poderá advertir, suspender ou cancelar a conta do usuário que:
        </Text>
        <Text style={styles.listItem}>a) Violarem este Termo;</Text>
        <Text style={styles.listItem}>b) Descumprirem seus deveres de usuário;</Text>
        <Text style={styles.listItem}>c) Tiverem comportamento fraudulento, doloso ou ofensivo a terceiros.</Text>

        <Text style={styles.sectionTitle}>10. Da Rescisão</Text>
        <Text style={styles.paragraph}>
          O descumprimento deste Termo ou da legislação aplicável poderá ensejar a rescisão unilateral imediata por parte do SENAR Rio e o bloqueio dos serviços prestados ao usuário.
        </Text>

        <Text style={styles.sectionTitle}>11. Das Alterações</Text>
        <Text style={styles.paragraph}>
          O SENAR Rio poderá, a qualquer tempo, alterar este Termo para adequação legal ou aprimoramento dos serviços. As alterações serão divulgadas no aplicativo, cabendo ao usuário decidir pela continuidade do uso ou pelo cancelamento do cadastro.
        </Text>

        <Text style={styles.sectionTitle}>12. Da Política de Privacidade</Text>
        <Text style={styles.paragraph}>
          Além deste Termo, o usuário deverá consentir com a Política de Privacidade, apresentada dentro da plataforma, a qual detalha o tratamento de dados pessoais.
        </Text>

        <Text style={styles.sectionTitle}>13. Do Foro</Text>
        <Text style={styles.paragraph}>
          Para dirimir eventuais controvérsias, aplica-se integralmente o Direito brasileiro. Fica eleito o foro da comarca da sede do SENAR Rio, no Rio de Janeiro, como competente para a resolução de conflitos oriundos deste Termo.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 8,
  },
  subSectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 5,
  },
  paragraph: {
    fontSize: 14,
    marginBottom: 10,
    lineHeight: 20,
  },
  listItem: {
    fontSize: 14,
    marginLeft: 15,
    marginBottom: 5,
    lineHeight: 20,
  },
});
