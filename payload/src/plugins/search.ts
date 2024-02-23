const searchOptions = ({
    collections: ["posts", "postCategories", "events"],
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