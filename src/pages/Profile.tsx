import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../hooks/AuthContext"; 
import { getMe, getUser, getAllUser } from "../Requests/UserCrudRequests";
import { ApiResponse, UserData } from "../Types/userCrud";
import { useParams } from 'react-router-dom';


function Profile() {
  const { authToken } = useContext(AuthContext);
  const [profile, setProfile] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();

  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (authToken) {
          const data: any = id ? await getUser(authToken, Number(id)) : await getMe(authToken);

          setProfile(data);
          console.log("Profil récupéré:", data);
        }
      } catch (err) {
        setError("Erreur lors de la récupération du profil");
        console.error("Erreur:", err);
      }
    };

    fetchProfile();
  }, [authToken]);

 
  if (error) {
    return <div>Erreur: {error}</div>;
  }

  if (!profile) {
    return <div>Chargement...</div>;
  }

 
  const user:any= profile.data;

  return (
    <div>
      <h2>Profil de l'utilisateur</h2>
      <p>Nom: {user.firstname}</p>
      <p>Prénom: {user.lastname}</p>
      <p>Email: {user.email}</p>
      <p>Rôles: {user.roles.join(", ")}</p>
    </div>
  );
}

export default Profile;
