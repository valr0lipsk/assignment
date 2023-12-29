# Movie App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## How to start 

Run npm run dev command

## Api endpoints

- auth
    + signIn (email: string, password: string) : User
- movie
    + add (movie: Movie) : bool
    + update (movie: Movie) : bool
    + getAll () : Movie[]
    + getById (id: string) : Movie
- s3
    + getS3AnimationUploadUrl (fileName: string): string

