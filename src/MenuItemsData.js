export const MenuItemsData = [
    {
        title: 'Moje dane i modele',
        url: '/',
        permission: 0,
    },
    {
        title: 'Listy',
        url: '/listresults',
        permission: 1,
    },
    {
        title: 'Zarządzanie',
        url: '',
        permission: 1,
        submenu: [
            {
                title: "Zarządzanie użytkownikami",
                url: "/registeredmodels",
                permission: 1,
            },
            {
                title: "Rejestracja",
                url: "/managemodels ",
                permission: 1,
            },
            {
                title: "Parametry",
                url: "/parameters ",
                permission: 1,
            },
        ]
    },
    {
        title: 'Nagrody',
        url: '',
        permission: 1,
        submenu: [
            {
                title: 'Łączenie kategorii',
                url: '/conneccategories',
                permission: 1,
            },
            {
                title: 'Kwalifikacja',
                url: '/qualification',
                permission: 1,
            },
            {
                title: 'Nagry specjlane',
                url: '/grandprixes',
                permission: 1,
            },
        ]
    },
    {
        title: 'Sędziowanie',
        url: '/jury',
        permission: 2,
    },
]
