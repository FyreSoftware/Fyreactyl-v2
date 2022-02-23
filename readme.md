## Mono-repository NestJS and React

<div style="text-align:center;">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
    <img src="https://upload.wikimedia.org/wikipedia/commons/9/9e/Plus_symbol.svg" width="120" alt="Plus" />
    <img src="https://upload.wikimedia.org/wikipedia/commons/4/47/React.svg" width="120" alt="ReactJS Logo" />
</div>
<br /><br />
Mono repository with NestJS and React with business logic and separated components library.

So, the repository has 4 parts:

- `client` A React application.
- `components` Graphics components used in `client`. The package has hot reload.
- `NestJS` The NestJS application.
- `business-logic` Logic shared between client and server. The package has hot reload.

## How to start it

To start the project, run `yarn dev`

Note: I am not sure if NPM works well with this setup so make sure to use yarn as me :D
