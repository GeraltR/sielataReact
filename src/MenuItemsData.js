export const MenuItemsData = [
    {
        title: 'Sędziowanie',
        url: '/jury',
        allowedRoles: 1,
    },
    {
        title: 'Listy',
        url: '/listresults',
        allowedRoles: 4,
    },
    {
        title: 'Zarządzanie',
        url: '',
        allowedRoles: 4,
        submenu: [
            {
                title: "Zarządzanie użytkownikami",
                url: "/registeredmodels",
                allowedRoles: 4,
            },
            {
                title: "Rejestracja",
                url: "/managemodels ",
                allowedRoles: 4,
            },
            {
                title: "Parametry",
                url: "/parameters ",
                allowedRoles: 4,
            },
        ]
    },
    {
        title: 'Nagrody',
        url: '',
        allowedRoles: 4,
        submenu: [
            {
                title: 'Łączenie kategorii',
                url: '/conneccategories',
                allowedRoles: 4,
            },
            {
                title: 'Kwalifikacja',
                url: '/qualification',
                allowedRoles: 4,
            },
            {
                title: 'Nagrody specjlane',
                url: '/grandprixes',
                allowedRoles: 4,
            },
            {
                title: 'Wyniki',
                url: '/diplomaslist',
                allowedRoles: 4,
            },
        ]
    },
]
