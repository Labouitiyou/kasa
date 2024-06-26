import { useParams } from 'react-router-dom';
import Slideshow from '../../components/slideshow/Slideshow.jsx'
import '../housingpage/Housingpage.css'
import Star from "../../assets/star.svg";
import StarGray from "../../assets/starGray.svg";
import Error from "../../pages/error/Error.jsx";
import Collapse from "../../components/collapse/Collapse.jsx";



function Housingpage({data}) {
// Extrait la valeur de l'ID de l'URL actuelle en utilisant useParams
const { id } = useParams();

// Recherche un élément dans un tableau 'data' dont la propriété 'id' est égale à la valeur de 'id' extrait de l'URL
const product = data.find(prod => prod.id === id);

// Vérifie si le produit a été trouvé ou non, affiche une page d'erreur si le produit n'est pas trouvé
if (!product) {
    return <Error/>
}

    const RatingStars = () => {
        const rating = parseInt(product.rating);
        const stars = [];
    
        // Créer les étoiles en ajoutant uniquement la classe "star"
        //créer une boucle for qui va itérer de 0 à 4
        for (let i = 0; i < 5; i++) {
            //vérifie si la valeur de i est inférieur à la variable rating
                if(i < rating){
                    //si oui ajoute une image d'étoile pleine au tableau stars
                    stars.push(<img src={Star} className="star" key={i} alt='étoile_pleine' />);
                }
                else{
                    //si non ajoute une étoile grise
                    stars.push(<img src={StarGray} className="starGray" key={i} alt='étoile_grise' />);
                }
            }  
        return stars;
    };

    return (
        <div className="wrapperProductPage">
            <Slideshow data={data}/>
            <div className="host">
                <div className="hostInfo">
                <p className="titleProduct">{product.title}</p>
                <p className="locationProduct">{product.location}</p>
                </div>
                <div className="hostProfil">
                <p className="hostName">{product.host.name}</p>
                <img className="hostPicture" src={product.host.picture} alt="host_picture"/>
                </div>
            </div>
            <div className="tagsStarContainer">
                <div className="tagsContainer">
                {product.tags.map((tag, index) => (
                    <p className="tagsProduct" key={index}>{tag}</p>
                ))}
                </div>
                <div className="contentVersionMobile">
                <div className="starsContainer">
                {RatingStars()}
                </div>
                <div className="hostProfilMobile">
                <p className="hostNameMobile">{product.host.name}</p>
                <img className="hostPictureMobile" src={product.host.picture} alt="host_picture"/>
                </div>
                </div>
            </div>

            <div className="descripEquipeContainer">
                <div className="description">
                <Collapse title="Description" content={product.description} />
                </div>
                <div className="equipement">
                <Collapse
                className="equipList"
                title="Équipement"
                content={product.equipments.map((equipment, index) => (
                <li key={index}>{equipment}</li> ))} />
                </div>
            </div>
        </div>
    );
}

export default Housingpage;