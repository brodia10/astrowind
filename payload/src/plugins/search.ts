const searchOptions = ({
    collections: ["posts", "events"],
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