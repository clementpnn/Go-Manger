import { Link } from "@tanstack/react-router";

export default function Admin() {
  return (
    <>
      <div>Admin</div>
      <Link to="/admin/restaurant" className="pointer">
        Voir tous les restaurants
      </Link>
    </>
  );
}

// TODO: Tableau de bord de l'admin
// vu sur les dernières commandes passées avec leur état (SSE ou WebSocket)
// poussibilité d'avoir plus d'information sur la commande de de changer l'état de la commande
// voir les demandes de tickets pour les restaurants et de les traiter (à voir)

// Lien vers autres pages
// possibilité de voir les restaurants et de les modifier / supprimer
// possibilité de voir les clients et de les modifier / supprimer
