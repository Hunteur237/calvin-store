// Modèles de SMS — max 160 caractères par message pour rester en 1 SMS (évite les surcoûts).
// Les templates admin sont envoyés sur ADMIN_PHONE.
// Les templates client sont envoyés sur le numéro fourni par le client.

export const smsTemplates = {
  contact: {
    admin:  d => `[Calvin Telecom] Nouveau message de ${d.name} (${d.phone || d.email || '?'}). Connectez-vous à l'admin pour voir.`,
    client: d => d.phone ? `Bonjour ${d.name?.split(' ')[0] || ''}, votre message a bien été reçu. Calvin Telecom vous répond sous 24h.` : null,
  },
  rdv: {
    admin:  d => `[Calvin Telecom] Nouveau RDV : ${d.name} le ${d.day} à ${d.slot}. Tél : ${d.phone}.`,
    client: d => `Bonjour ${d.name?.split(' ')[0] || ''}, votre RDV du ${d.day} à ${d.slot} est bien enregistré. Calvin Telecom vous confirme bientôt.`,
  },
  devis: {
    admin:  d => `[Calvin Telecom] Nouveau devis : ${d.name} — ${d.project_type}. Estimation : ${Number(d.estimated_total||0).toLocaleString('fr-FR')} FCFA.`,
    client: d => d.phone ? `Bonjour ${d.name?.split(' ')[0] || ''}, votre devis (${d.project_type}) est reçu. Estimation : ${Number(d.estimated_total||0).toLocaleString('fr-FR')} FCFA. Réponse sous 24h.` : null,
  },
  order: {
    admin:  d => `[Calvin Telecom] Commande de ${d.client_name}. Total : ${Number(d.total||0).toLocaleString('fr-FR')} FCFA. Tél : ${d.client_phone}.`,
    client: d => d.client_phone ? `Bonjour ${d.client_name?.split(' ')[0] || ''}, votre commande Calvin Telecom de ${Number(d.total||0).toLocaleString('fr-FR')} FCFA est enregistrée. Nous vous contactons bientôt.` : null,
  },
  order_paid: {
    admin:  d => `[Calvin Telecom] Paiement reçu ! Commande de ${d.client_name} — ${Number(d.total||0).toLocaleString('fr-FR')} FCFA.`,
    client: d => d.client_phone ? `Paiement de ${Number(d.total||0).toLocaleString('fr-FR')} FCFA confirmé. Votre commande Calvin Telecom est en préparation. Merci !` : null,
  },
}
