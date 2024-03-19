import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import {port} from "../Variables/localhost";

const UpdateProduct = () => {
    // Déclaration des états
    const [productData, setProductData] = useState({
        label: null,
        description: null,
        price: null
    });
    const [field, setField] = useState(false);
    const { label, description, price } = productData;
    const { id } = useParams(); // Obtention de l'ID du produit à mettre à jour

    const redirect = useNavigate(); // Hook pour gérer la navigation

    // Effet pour charger les données du produit à mettre à jour
    useEffect(() => {
        axios.get(`http://localhost:${port}/MyWebApi/rest/products/${id}`)
            .then((res) => {
                // Remplacement des valeurs null par des chaînes vides
                const data = res.data;
                for (const key in data) {
                    if (data[key] === null) {
                        data[key] = "";
                    }
                }
                setProductData(data); // Mise à jour des données du produit
            })
            .catch(error => console.log(error));
    }, [id]); // Dépendance à l'ID du produit pour recharger les données en cas de changement

    // Fonction pour gérer les changements dans les données du formulaire
    const handleData = (e) => {
        setProductData({ ...productData, [e.target.name]: e.target.value });
    }

    // Fonction pour soumettre les données mises à jour
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`http://localhost:${port}/MyWebApi/rest/products/${id}`, productData)
            .then(() => {
                setField(true); // Mise à jour du champ pour indiquer que la mise à jour est effectuée
                redirect('/showproduct'); // Redirection vers la page d'affichage des produits
            })
            .catch(error => console.log(error));
    }

    return (
        <>
            <h1 className="h1">Modifier le produit</h1>
            <form action="#" onSubmit={handleSubmit}>
                {/* Champ pour le nom du produit */}
                <p>
                    <label className="form-label" htmlFor="prname">Nom du produit : </label>
                    <input className="form-control" type="text" name="label" id="prname" value={label || ''} onChange={handleData} />
                </p>
                {/* Champ pour la description du produit */}
                <p>
                    <label className="form-label" htmlFor="prdec">Description du produit : </label>
                    <textarea className="form-control" name="description" id="prdec" cols="30" rows="5" value={description || ''} onChange={handleData}></textarea>
                </p>
                {/* Champ pour le prix du produit */}
                <p>
                    <label className="form-label" htmlFor="primg">Prix du produit : </label>
                    <input className="form-control" type="number" name="price" id="primg" value={price || ''} onChange={handleData} />
                </p>
                {/* Bouton pour soumettre le formulaire */}
                <p><input className="btn btn-primary" type="submit" value="Mettre à jour le produit" /></p>
            </form>
        </>
    )
}

export default UpdateProduct;
