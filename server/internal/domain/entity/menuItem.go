package entity

type MenuItemType string

const (
	MenuItemStarter MenuItemType = "starter"
	MenuItemDish    MenuItemType = "dish"
	MenuItemDessert MenuItemType = "dessert"
	MenuItemDrink   MenuItemType = "drink"
)

type MenuItem struct {
	Name        string       `json:"name"`
	Description string       `json:"description"`
	Type        MenuItemType `json:"type"`
	Price       float64      `json:"price"`
}
