"use client"
import { useRouter } from "next/navigation";
import Modal from "./Modal";
import {useSupabaseClient, useSessionContext} from "@supabase/auth-helpers-react"
import { Auth } from "@supabase/auth-ui-react";
import {ThemeSupa} from "@supabase/auth-ui-shared"
import useAuthModal from "@/hooks/useAuthModal";
import { useEffect } from "react";

const AuthModal = () => {
    const supabaseClient = useSupabaseClient();
    const router  = useRouter();
    const { session } = useSessionContext();
    const {onClose , isOpen} = useAuthModal();

    useEffect(() => {
        if(session){
            router.refresh();
            onClose();
        }
    },[session, router, onClose])

    const onChange = (open: boolean) =>{
        if(!open){
            onClose();
        }
    }
  return (
    <Modal 
    title="Bem vindo de volta"
    description="Logar com sua conta"
    isOpen={isOpen}
    onChange={onChange}
    >
        <Auth
            theme="dark"
            magicLink
            providers={["github","facebook","google"]}
            supabaseClient={supabaseClient}
            localization={{
                variables: {
                  sign_in: {
                    email_label: 'E-mail',
                    password_label: 'Senha',
                    email_input_placeholder: "Seu E-mail",
                    password_input_placeholder: "Sua Senha",
                    button_label: "Entrar",
                    loading_button_label: "Entrando ...",
                    social_provider_text: "Entrar com {{provider}}",
                    link_text: "Já tem uma conta? Entrar",                   
                  },
                  sign_up: {
                    email_label: 'E-mail',
                    password_label: 'Senha',
                    email_input_placeholder: "Seu E-mail",
                    password_input_placeholder: "Sua Senha",
                    button_label: "Criar",
                    loading_button_label: "Entrar ...",
                    social_provider_text: "Entrar com {{provider}}",
                    link_text: "Não tem uma conta? Criar", 
                    confirmation_text : "Verifique seu e-mail para o link de confirmação"                 
                  },
                   magic_link: {
                    email_input_label: "E-mail",
                    email_input_placeholder: "Senha",
                    button_label: "Enviar Link Mágico",
                    loading_button_label: "Enviando Link Mágico ...",
                    link_text: "Link Mágico",
                    confirmation_text: "Verifique se recebeu o link mágico"
                  },
                  forgotten_password: {
                    email_label: "E-mail",
                    password_label: "Senha",
                    email_input_placeholder: "Seu E-mail",
                    button_label: "Enviar Recuperar Senha",
                    loading_button_label: "Enviando recuperar senha ...",
                    link_text: "Esqueceu sua senha?",
                    confirmation_text: "Verifique seu e-mail para recuperar a senha"
                  },
                },
              }}

            appearance={{
                theme: ThemeSupa,
                variables:{
                    default:{
                        colors:{
                            brand:'#404040',
                            brandAccent:'#22c55e'
                        }
                    },
                    
                }
            }}
        />
    </Modal>
  )
}

export default AuthModal;