import React from "react";
import { StyledRegisterVideo } from "./styles";
import { createClient } from "@supabase/supabase-js"

function userForm(propsDoForm) {
    const [values, setValues] = React.useState(propsDoForm.initialValues);
    return {
        values,
        handleChange: (evento) => {
            const value = evento.target.value;
            const name = evento.target.name;
            console.log(evento.target.name);
            setValues({
                ...values,
                [name]: value,
            });
        },
        clearForm() {
            setValues({});
        }
    }
};

const URL_PROJECT = 'https://ixytayenbcwgwaerrjml.supabase.co'
const PUBLIC_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4eXRheWVuYmN3Z3dhZXJyam1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzAxNzQ4ODcsImV4cCI6MTk4NTc1MDg4N30.r8URUVfxy6uToMyjusmDOJXub_d6b0F_uLV00iGIpqo'
const supabase = createClient(URL_PROJECT, PUBLIC_KEY)

//get thumbnail
function getThumbnail(url){
    return `https://img.youtube.com/vi/${url.split("v=")[1]}/hgdefalt.jpg`
}

//get youtube video id
// function getVideoId(url){
//     const videoId = url.split("v=")[1];
//     const ampersandPosition = videoId.indexOf("&");
//     if(ampersandPosition !== -1){
//         return videoId.substring(0, ampersandPosition);
//     }
//     return videoId;
// }


export default function RegisterVideo() {
    const formCadastro = userForm({
        initialValues: { titulo: "Frostpunk - Neve e Steak tartare", url: "https://www.youtube.com/watch?v=QsqatJxAUtk" }
    });
    const [formVisivel, setFormVisivel] = React.useState(false);

    console.log();

    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisivel(true)}>+</button>
            {formVisivel
                ? (
                    <form onSubmit={(evento) => {
                        evento.preventDefault();
                        setFormVisivel(false);
                        formCadastro.clearForm();
                        console.log(formCadastro.values);

                        //contrato entre o Front eo Back-end
                        supabase.from("video").insert({
                            title: formCadastro.values.titulo,
                            url: formCadastro.values.url,
                            thumbs: getThumbnail(formCadastro.values.url),
                            playlist: "jogos"
                        }).then((oqueveio) => {
                            concole.log(oqueveio)
                        }).catch((err) => {                            
                            console.log(err)
                        })

                    }}>
                        <div>
                            <button type="button" className="close-modal" onClick={() => setFormVisivel(false)}> X </button>
                            <input placeholder="Titulo do vídeo"
                                name="titulo"
                                value={formCadastro.values.titulo}
                                onChange={formCadastro.handleChange} />
                            <input placeholder="URL"
                                name="url"
                                value={formCadastro.values.url}
                                onChange={formCadastro.handleChange} />
                            <button type="submit">Cadastrar</button>
                        </div>
                    </form>)
                : false
            }
        </StyledRegisterVideo>
    )
}
