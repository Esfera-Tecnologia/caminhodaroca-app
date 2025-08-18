export const messages = {
  required: `Preencha este campo`,
  positive: `Informe um número maior que 0`,
  invalidEmail: "Email inválido.",
  max: (max: number) => `Informe um número menor ou igual a ${max}`,
  min: (min: number) => `Informe um número maior ou igual a ${min}`,
  minLength: (min: number) => `Mínimo de ${min} caracteres.`,
  maxLength: (max: number) => `Máximo de ${max} caracteres.`,
  invalidDate: (format: string) => `Informe uma data válida no formato ${format}.`,
  invalidTime: (format: string) => `Informe uma hora válida no formato ${format}`,
  timeLessThan: `Hora de fim deve ser maior que a hora de início`,
  storeSuccess: (entity: string) => `O cadastro de ${entity} foi realizado com sucesso.`,
  updateSuccess: (entity: string) => `A atualização de ${entity} foi realizada com sucesso.`,
  deleteSuccess: (entity: string) => `A exclusão de ${entity} foi realizada com sucesso.`,
  submitFail: `Alguns dados são inválidos. Por favor, confira os campos e tente novamente.`,
  internalError: 'Erro interno ao submeter o formulário'
};