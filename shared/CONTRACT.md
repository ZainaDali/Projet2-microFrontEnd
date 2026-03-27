# Contrat d'événements — RetroShop

## Événement : `product:added`
Émis par   : mfe-product (ProductGrid), mfe-reco (Recommendations)
Écouté par : mfe-cart (Cart)

Payload :
{
  id:       number   — identifiant produit
  name:     string
  price:    number   — en EUR
  image:    string
  category: string
  cartId:   string   — `${Date.now()}-${Math.random()}` (unicité panier)
}

## Événement : `cart:updated`
Émis par   : mfe-cart (Cart)
Écouté par : shell (badge header), mfe-reco (adapter les recos)

Payload :
{
  items: array    — copie du state items
  count: number   — items.length
}