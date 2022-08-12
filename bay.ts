import {Patch, StaticAssetRouter, MainBay, PBUtils} from "bun-patchbay";

class UserPage extends Patch {
    entry(req: Request) {
        this.parseRouteParams();
        console.log("Route parameters: ", this.routeParameters);
        console.log("Query string parameters: ", this.queryStringParameters);
    }

    exit(): Response {
        return PBUtils.TemplateResponse('user-homepage', {
            user: this.routeParameters.username
        });
    }
}

const mainBay: MainBay = {
    baseURL: "http://localhost:3000",
    port: 3000,
    patches: [
        new StaticAssetRouter("/", "./dist"),
        new UserPage("/{username}{queryString}")
    ]
}

export default mainBay;
