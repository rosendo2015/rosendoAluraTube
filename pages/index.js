import React from "react";
import config from "../config.json"
import styled from "styled-components";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";

function HomePage() {
   
    const [valorDoFiltro, setValorDoFiltro] = React.useState("");
   
    //console.log(config.playlists)

    return (
        <>
            
            <div>
                <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro}/>
                <Header />
                <TimeLine searchValue={valorDoFiltro} playlists={config.playlists}>
                    conteúdo
                </TimeLine>
            </div>
        </>


    );
}

export default HomePage
/*
function Menu() {
    return (
        <div>
            
        </div>

    )
}
*/
const StyledHeader = styled.div`
background-color: ${({theme}) => theme.backgroundLevel1};

img{
    width: 80px;
    height: 80px;
    border-radius: 50%;
}
.user-info{
    
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 32px;    
    gap: 16px;
}
`;

const StyledBanner = styled.div`
background-color: blue;
background-image: url(${({ bg }) => bg});
height: 230px;
`;
function Header() {
    return (
        <StyledHeader>
            <StyledBanner bg={config.bg} />
            {/*<img src="" alt="banner"></img>*/}
            <section className="user-info">
                <img src={`https://github.com/${config.github}.png`} />
                <div>
                    <h2>
                        {config.name}
                    </h2>
                    <p>
                        {config.job}
                    </p>
                </div>
            </section>
        </StyledHeader>

    )
}

function TimeLine({ searchValue, ...props }) {
    //console.log("Dentro do componente", props);
    const playlistsNames = Object.keys(props.playlists);
    //statment
    //Retorno por expressão
    return (
        <StyledTimeline>
            {playlistsNames.map((playlistsNames) => {
                const videos = props.playlists[playlistsNames];
                
                return (
                    <section key={playlistsNames}>
                        <h2>{playlistsNames}</h2>
                        <div>
                            {videos.filter((video) => {
                                const titleNormalized = video.title.toLowerCase();
                                const searchValueNormalized = searchValue.toLowerCase();
                                return titleNormalized.includes(searchValueNormalized)
                            }).map((video) => {
                                return (
                                    <a key={video.url} href={video.url} >
                                        <img src={video.thumb} />
                                        <span>
                                            {video.title}
                                        </span>
                                    </a>
                                )
                            })}
                        </div>
                    </section>
                )
            })}

        </StyledTimeline>

    )
}