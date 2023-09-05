import { Injectable } from '@nestjs/common';
import { Admin } from '../admin/models/admin.model';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '../user/models/user.model';

@Injectable()
export class MailService {
  constructor(private mailService: MailerService) {}

  async sendUserConfirmation(admin: Admin): Promise<void> {
    const url = `${process.env.API_HOST}/api/admin/activate/${admin.activation_link}`;
    console.log(url);
    await this.mailService.sendMail({
      to: admin.email,
      subject: `Welcome to Gold Shop! confirm your email`,
      template: './confirmation.hbs',
      context: {
        name: admin.first_name,
        url: url,
      },
    });
  }
}

@Injectable()
export class MailService1 {
  constructor(private mailService: MailerService) {}

  async sendUserConfirmation(user: User): Promise<void> {
    const url = `${process.env.API_HOST}/api/user/activate/${user.activation_link}`;
    console.log(url);
    await this.mailService.sendMail({
      to: user.email,
      subject: `Welcome to Gold Shop! confirm your email`,
      template: './confirmation.hbs',
      context: {
        name: user.first_name,
        url: url,
      },
    });
  }
}
