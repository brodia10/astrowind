const searchOptions = ({
    collections: ["posts", "categories", "events"],
    // defaultPriorities: {
    //     posts: 20,
    // },
    searchOverrides: {
        admin: {
            group: 'Admin',
        }
    }
});

export default searchOptions