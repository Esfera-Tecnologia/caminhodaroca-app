import Card from "@/components/Card";
import { CardHeader } from "@/components/CardHeader";
import DefaultModal from "@/components/DefaultModal";

export default function ResetPasswordModal() {
  return (
    <DefaultModal visible={true}>
     <Card>
        <CardHeader title="Recuperar Senha" />
      </Card>
    </DefaultModal>
  )
}