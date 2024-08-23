import  { useState } from 'react';

export default function Profile({ client, onBack }: { client: any, onBack: any }) {
    const [activeTab, setActiveTab] = useState('Info'); 

    if (!client) {
        return <div>No client selected.</div>;
    }

   
    const renderContent = () => {
        switch (activeTab) {
            case 'Info':
                return <div>Informations générales sur le client : {client.client}</div>;
            case 'Envies':
                return <div>Liste des envies du client</div>;
            case 'Panier':
                return <div>Contenu du panier du client</div>;
            case 'Commandes':
                return <div>Historique des commandes du client</div>;
            case 'Facture':
                return <div>Factures du client</div>;
            case 'Code Promo':
                return <div>Codes promo disponibles pour le client</div>;
            default:
                return null;
        }
    };

    return (
        <div>
            <div className="flex flex-col items-center bg-card p-6 rounded-lg shadow-md">
                <img className="w-24 h-24 rounded-full border-4 border-primary" src="https://placehold.co/96x96" alt="User profile picture" />
                <h2 className="mt-4 text-lg font-semibold text-foreground">{client.client}</h2>
                <p className="text-muted-foreground text-center">
                    {client.email}
                </p>
                <hr className="w-full border-t border-primary my-4" />
                <div className="flex space-x-4">
                    <span 
                        className={`text-muted-foreground cursor-pointer ${activeTab === 'Info' ? 'text-primary' : ''}`} 
                        onClick={() => setActiveTab('Info')}
                    >
                        Info
                    </span>
                    <span 
                        className={`text-muted-foreground cursor-pointer ${activeTab === 'Envies' ? 'text-primary' : ''}`} 
                        onClick={() => setActiveTab('Envies')}
                    >
                        Envies
                    </span>
                    <span 
                        className={`text-muted-foreground cursor-pointer ${activeTab === 'Panier' ? 'text-primary' : ''}`} 
                        onClick={() => setActiveTab('Panier')}
                    >
                        Panier
                    </span>
                    <span 
                        className={`text-muted-foreground cursor-pointer ${activeTab === 'Commandes' ? 'text-primary' : ''}`} 
                        onClick={() => setActiveTab('Commandes')}
                    >
                        Commandes
                    </span>
                    <span 
                        className={`text-muted-foreground cursor-pointer ${activeTab === 'Facture' ? 'text-primary' : ''}`} 
                        onClick={() => setActiveTab('Facture')}
                    >
                        Facture
                    </span>
                    <span 
                        className={`text-muted-foreground cursor-pointer ${activeTab === 'Code Promo' ? 'text-primary' : ''}`} 
                        onClick={() => setActiveTab('Code Promo')}
                    >
                        Code Promo
                    </span>
                </div>
                <div className="mt-4 w-full">
                    {renderContent()}
                </div>
                <button 
                    onClick={onBack} 
                    className="mt-4 text-primary hover:underline">
                    Retour
                </button>
            </div>
        </div>
    );
}
