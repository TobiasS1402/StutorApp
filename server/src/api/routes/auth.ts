import { NextFunction, Request, Response, Router } from "express";
import Container from "typedi";
import SurfOAuth2 from "../../config/OAuth2/SurfOAuth2";
import AuthService from "../../service/auth";
import util from "../../util";
import got from "got";

const route = Router();
const oauth = SurfOAuth2;

export default (app: Router) => {
  app.use("/auth", route);

  route.get(
    "/signup",
    async (req: Request, res: Response, next: NextFunction) => {
      var uri = oauth.code.getUri();
      res.redirect(uri);
    }
  );

  route.get(
    "/callback",
    async (req: Request, res: Response, next: NextFunction) => {
      const user = await oauth.code.getToken(req.originalUrl);

      var request = user.sign({
        url: "https://connect.test.surfconext.nl/oidc/userinfo",
      });

      const data = await got(request.url, {
        headers: {
          Authorization: request["headers"]["Authorization"],
        },
      });
      console.log(data);

      return res.send(JSON.parse(data.body));
    }
  );
};
