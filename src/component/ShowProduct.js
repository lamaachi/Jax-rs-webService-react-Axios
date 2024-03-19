import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ShowProduct = () => {
    // Définir l'état initial pour les produits
    const [products, setProducts] = useState([]);

    // Fonction pour récupérer les données des produits depuis le serveur
    const getProductData = () => {
        axios.get('http://localhost:9090/MyWebApi/rest/products')
            .then(res => setProducts(res.data))
            .catch(error => console.error("Erreur lors de la récupération des produits :", error));
    }

    // Utiliser useEffect pour charger les données des produits au chargement du composant
    useEffect(() => {
        getProductData();
    }, []);

    // Fonction pour supprimer un produit
    const handleDelete = (id) => {
        axios.delete(`http://localhost:9090/MyWebApi/rest/products/${id}`)
            .then(() => {
                getProductData(); // Rafraîchir la liste des produits après la suppression
            })
            .catch(error => console.error("Erreur lors de la suppression du produit :", error));
    }

    return (
        <div>
            <h1 className="h1">Liste des produits</h1>
            <Link className="btn btn-primary" to={"/"}>
                Ajouter d'autres produits
            </Link>
            <table className="table m-auto table-bordered">
                <thead>
                <tr>
                    <th>Nom du produit</th>
                    <th>Description du produit</th>
                    <th>Prix du produit</th>
                    <th colSpan="2">Action</th>
                </tr>
                </thead>
                <tbody>
                {products.map((item) => (
                    <tr key={item.id}>
                        <td>{item.label}</td>
                        <td>{item.description}</td>
                        <td>{item.price} MAD</td>
                        <td>
                            <Link to={`/updateproduct/${item.id}`}>
                                <button className="btn btn-primary">
                                    Modifier
                                </button>
                            </Link>
                        </td>
                        <td>
                            <button
                                className="btn btn-danger"
                                onClick={() => handleDelete(item.id)}>
                                Supprimer
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default ShowProduct;
