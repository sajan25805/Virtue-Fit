import { MailtrapClient } from "mailtrap";
import config from "../config/config.js";

export const mailtrapClient = new MailtrapClient({
	endpoint:config.mailtrap.endpoint,
	token:config.mailtrap.token ,
});

export const sender = {
  email: "hello@demomailtrap.com",
  name: "Mailtrap Test",
};


