package service

import (
	"fmt"
	"net/smtp"
	"os"
)

func SendEmail(to, subject, password string) error {
	from := os.Getenv("SMTP_EMAIL")
	pass := os.Getenv("SMTP_EMAIL_PASSWORD")

	smtpHost := "smtp." + os.Getenv("SMTP_EMAIL")
	smtpPort := os.Getenv("SMTP_PORT")

	auth := smtp.PlainAuth("", from, pass, smtpHost)

	mime := "MIME-version: 1.0;\nContent-Type: text/html; charset=\"UTF-8\";\n\n"
	body := fmt.Sprintf(`
        <html>
        <body>
            <h2>Bienvenue sur Go Manger!</h2>
            <p>Votre compte a été créé avec succès. Voici vos informations de connexion :</p>
            <table>
                <tr>
                    <td>Email :</td>
                    <td>%s</td>
                </tr>
                <tr>
                    <td>Mot de passe :</td>
                    <td>%s</td>
                </tr>
            </table>
            <p>Nous vous recommandons de changer votre mot de passe dès votre première connexion.</p>
            <p><a href="https://go-manger.com/login">Cliquez ici pour vous connecter</a></p>
            <p>Merci de nous avoir choisi pour vos aventures culinaires !</p>
        </body>
        </html>
    `, to, password)

	msg := []byte("To: " + to + "\r\n" +
		"Subject: " + subject + "\r\n" +
		mime + "\r\n" +
		body)

	err := smtp.SendMail(smtpHost+":"+smtpPort, auth, from, []string{to}, msg)
	if err != nil {
		return err
	}

	return nil
}
