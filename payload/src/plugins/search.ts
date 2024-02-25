const searchOptions = ({
    collections: ["posts", "categories", "events"],
    // defaultPriorities: {
    //     posts: 20,
    // },
    searchOverrides: {
        admin: {
            group: 'Audience',
        }
    }
});

export default searchOptions