export const MenuItemsData = [
    {
        title: 'Moje dane i modele',
        url: '/',
        permission: 0,
        name: 'A',
    },
    {
        title: 'Listy',
        url: '/listresults',
        permission: 1,
        name: 'B',
    },
    {
        title: 'Zarządzanie',
        url: '',
        permission: 1,
        name: 'C',
        submenu: [
            {
                title: "Zarządzanie użytkownikami",
                url: "/registeredmodels",
                permission: 1,
            },
            {
                title: "rejestracja użytkowników i modeli",
                url: "/managemodels ",
                permission: 1,
            },
            {
                title: "parametry",
                url: "/parameters ",
                permission: 1,
            },
        ]
    },
    {
        title: 'Nagrody',
        url: '',
        permission: 1,
        name: 'D',
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
        name: 'E',
    },
]
