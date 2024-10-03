import React, { useState, useCallback } from 'react'; 
import { Container, Form, FormGroup, Label, Input, Button, FormFeedback, Alert } from 'reactstrap';

interface FormData {
  nome: string;
  setor: string;
  email: string;
  telefone: string;
}

interface Errors {
  [key: string]: string;
}

const CadastroGestorSetorial: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    setor: '',
    email: '',
    telefone: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const validateEmail = (email: string): string | null => {
    const re = /^[^\s@]+@([^\s@]+\.)*ufs\.br$/;
    if (!email.trim()) return 'E-mail é obrigatório';
    if (!re.test(email)) return 'O e-mail deve terminar com ufs.br';
    return null;
  };

  const validateTelefone = (telefone: string): string | null => {
    const re = /^(?:\(?\d{2}\)? ?9\d{4}-?\d{4}|\d{2} ?9\d{4}-?\d{4}|\d{2}9\d{4}-?\d{4})$/;
    if (!telefone.trim()) return 'Telefone é obrigatório';
    if (!re.test(telefone)) {
      return 'Formato de telefone inválido. Use (DDD) 9 + 8 dígitos ou DDD 9 + 8 dígitos';
    }
    return null;
  };

  const validateNome = (nome: string): string | null => {
    const re = /^[A-Za-zÀ-ÿ\s]+$/;
    if (!nome.trim()) return 'Nome é obrigatório';
    if (!re.test(nome)) return 'Nome deve conter apenas letras';
    return null;
  };

  const validateSetor = (setor: string): string | null => {
    if (!setor.trim()) return 'Setor de atuação é obrigatório';
    return null;
  };

  const validateForm = (): Errors => {
    const newErrors: Errors = {};
    const emailError = validateEmail(formData.email);
    const telefoneError = validateTelefone(formData.telefone);
    const nomeError = validateNome(formData.nome);
    const setorError = validateSetor(formData.setor);

    if (nomeError) newErrors.nome = nomeError;
    if (setorError) newErrors.setor = setorError;
    if (emailError) newErrors.email = emailError;
    if (telefoneError) newErrors.telefone = telefoneError;

    return newErrors;
  };

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: name === 'nome' ? validateNome(value) || '' :
               name === 'email' ? validateEmail(value) || '' :
               name === 'telefone' ? validateTelefone(value) || '' :
               name === 'setor' ? validateSetor(value) || '' :
               ''
    }));
  }, [formData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSuccessMessage(null);
      setIsSubmitting(false);
      return;
    }

    // Simulação de envio com delay
    setTimeout(() => {
      setSuccessMessage('Cadastro realizado com sucesso!');
      setErrors({});
      setFormData({ nome: '', setor: '', email: '', telefone: '' });

      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <Container className="d-flex flex-column align-items-center" style={{ maxWidth: '600px', backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '8px', fontFamily: 'Arial, sans-serif' }}>
      <h2 className="mb-4" style={{ backgroundColor: '#EEEDFE', padding: '10px', color: '#000', fontWeight: 'bold', textAlign: 'center', borderRadius: '5px', fontSize: '1.5rem' }}>
        Cadastro de Gestor Setorial
      </h2>
      {successMessage && <Alert color="success" aria-live="polite">{successMessage}</Alert>}
      <Form onSubmit={handleSubmit} className="w-100">
        <FormGroup style={{ display: 'flex', marginBottom: '1rem' }}>
          <Label for="nome" style={{ color: '#000', fontSize: '1rem', flex: '0 0 150px' }}>Nome:</Label>
          <div style={{ flex: '1' }}>
            <Input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              invalid={!!errors.nome}
              placeholder="Digite seu nome"
              style={{ fontSize: '1rem', borderColor: errors.nome ? 'red' : undefined }}
            />
            {errors.nome && <FormFeedback style={{ display: 'block' }}>{errors.nome}</FormFeedback>}
          </div>
        </FormGroup>

        <FormGroup style={{ display: 'flex', marginBottom: '1rem' }}>
          <Label for="setor" style={{ color: '#000', fontSize: '1rem', flex: '0 0 150px' }}>Setor de Atuação:</Label>
          <div style={{ flex: '1' }}>
            <Input
              type="select"
              id="setor"
              name="setor"
              value={formData.setor}
              onChange={handleChange}
              invalid={!!errors.setor}
              style={{ fontSize: '1rem' }}
            >
              <option value="">Selecione</option>
              <option value="limpeza">Limpeza</option>
              <option value="manutencao">Manutenção</option>
              <option value="infraestrutura">Infraestrutura</option>
              <option value="administrativo">Administrativo</option>
              <option value="academico">Acadêmico</option>
              <option value="tecnologia_informacao">Tecnologia da Informação</option>
            </Input>
            {errors.setor && <FormFeedback style={{ display: 'block' }}>{errors.setor}</FormFeedback>}
          </div>
        </FormGroup>

        <FormGroup style={{ display: 'flex', marginBottom: '1rem' }}>
          <Label for="email" style={{ color: '#000', fontSize: '1rem', flex: '0 0 150px' }}>E-mail:</Label>
          <div style={{ flex: '1' }}>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              invalid={!!errors.email}
              placeholder="exemplo@ufs.br"
              style={{ fontSize: '1rem', borderColor: errors.email ? 'red' : undefined }}
            />
            {errors.email && <FormFeedback style={{ display: 'block' }}>{errors.email}</FormFeedback>}
          </div>
        </FormGroup>

        <FormGroup style={{ display: 'flex', marginBottom: '1rem' }}>
          <Label for="telefone" style={{ color: '#000', fontSize: '1rem', flex: '0 0 150px' }}>Telefone:</Label>
          <div style={{ flex: '1' }}>
            <Input
              type="text"
              id="telefone"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              invalid={!!errors.telefone}
              placeholder="99 99999-9999"
              style={{ fontSize: '1rem', borderColor: errors.telefone ? 'red' : undefined }}
            />
            {errors.telefone && <FormFeedback style={{ display: 'block' }}>{errors.telefone}</FormFeedback>}
          </div>
        </FormGroup>

        <Button
          type="submit"
          className="w-100"
          style={{ backgroundColor: '#EEEDFE', borderColor: '#EEEDFE', color: '#000', fontSize: '1rem', fontWeight: 'bold' }}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Salvando...' : 'Salvar'}
        </Button>
      </Form>
    </Container>
  );
};

export default CadastroGestorSetorial;
