import transport from '../transport'
import config from '../../../config'
import logger from '../../logger'

interface MailConfig {
  to: string
  token: string
}

export default ({ to, token }: MailConfig) => {
  logger.info(`Sending ConfirmRegister email to ${to}`)
  transport.sendMail(
    {
      from: '<steamslab.brasil@gmail.com>',
      to: to,
      subject: 'Confirmação de Conta - SteamsLab',
      text: '',
      html: `
      <!DOCTYPE html><html>
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
          <style>
            @media screen{
              @font-face{
                font-family:"Lato";
                font-style:normal;
                font-weight:400;
                src:local("Lato Regular"), local("Lato-Regular"), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format("woff")
              }
              @font-face{
                font-family:"Lato";
                font-style:normal;
                font-weight:700;
                src:local("Lato Bold"), local("Lato-Bold"), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format("woff")
              }
              @font-face{
                font-family:"Lato";
                font-style:italic;
                font-weight:400;
                src:local("Lato Italic"), local("Lato-Italic"), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format("woff")
              }
              @font-face{
                font-family:"Lato";
                font-style:italic;
                font-weight:700;
                src:local("Lato Bold Italic"), local("Lato-BoldItalic"), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format("woff")
              }
            }
            body,table,td,a{
              -webkit-text-size-adjust:100%;
              -ms-text-size-adjust:100%
            }
            table,td{
              mso-table-lspace:0pt;
              mso-table-rspace:0pt
            }
            img{
              -ms-interpolation-mode:bicubic
            }
            img{
              border:0;
              height:auto;
              line-height:100%;
              outline:none;
              text-decoration:none
            }
            table{
              border-collapse:collapse !important
            }
            body{
              height:100% !important;
              margin:0 !important;
              padding:0 !important;
              width:100% !important
            }
            a[x-apple-data-detectors]{
              color:inherit !important;
              text-decoration:none !important;
              font-size:inherit !important;
              font-family:inherit !important;
              font-weight:inherit !important;
              line-height:inherit !important
            }
            @media screen and (max-width: 600px){
              h1{
                font-size:32px !important;
                line-height:32px !important
              }
            }div[style*="margin: 16px 0;"]{
              margin:0 !important
            }
            </style>
        </head>

        <body class="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;" >
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td bgcolor="#FF6D8D" align="center">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px">
                  <tr>
                    <td align="center" valign="top" style="padding: 40px 10px 40px 10px"></td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td bgcolor="#FF6D8D" align="center" style="padding: 0px 10px 0px 10px">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px">
                  <tr>
                    <td bgcolor="#ffffff" align="center" valign="top" style=" padding: 40px 20px 20px 20px; border-radius: 8px 8px 0px 0px; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px; ">
                      <img src="https://dev.steamslab.com/logo.png" width="200" height="112" style="display: block; border: 0px"/>
                      <h1 style=" font-size: 48px; font-weight: 400; margin: 2; color: #50393e; ">Bem Vindo!</h1>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px">
                  <tr>
                    <td bgcolor="#ffffff" align="left" style=" padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px; ">
                      <p style="margin: 0"> Estamos ansiosos para que você comece. Primeiro, precisamos que você confirme sua conta. Basta pressionar o botão abaixo.</p>
                    </td>
                  </tr>
                  <tr>
                    <td bgcolor="#ffffff" align="left">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px">
                            <table border="0" cellspacing="0" cellpadding="0">
                              <tr>
                                <td align="center" style="border-radius: 8px" bgcolor="#FF6D8D">
                                  <a href="https://${
                                    config.environment === 'development' ? 'dev.' : ''
                                  }steamslab.com/confirm/sign-up/${token}" target="_blank" style=" font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; display: inline-block; ">Confirmar Conta</a>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td bgcolor="#ffffff" align="left" style=" padding: 0px 30px 0px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px; ">
                      <p style="margin: 0"> Se isso não funcionar, copie e cole o seguinte link no seu navegador:</p>
                    </td>
                  </tr>
                  <tr>
                    <td bgcolor="#ffffff" align="left" style=" padding: 20px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px; ">
                      <p style="margin: 0">
                        <a href="https://${
                          config.environment === 'development' ? 'dev.' : ''
                        }steamslab.com/confirm/sign-up/${token}" target="_blank" style="color: #ff6d8d">https://${
        config.environment === 'development' ? 'dev.' : ''
      }steamslab.com/confirm/sign-up/${token}</a>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td bgcolor="#ffffff" align="left" style=" padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px; ">
                      <p style="margin: 0"> Se você tem alguma dúvida, basta entrar em contato utilizando o e-mail abaixo.</p>
                      <p style="margin: 0" align="center">
                        <a href="mailto:ajuda@steamslab.com" style="color: #ff6d8d"> ajuda@steamslab.com </a>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td bgcolor="#ffffff" align="left" style=" padding: 0px 30px 40px 30px; border-radius: 0px 0px 8px 8px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px; ">
                      <p style="margin: 0">Abraços,<br/>Equipe SteamsLab</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td bgcolor="#f4f4f4" align="center" style="padding: 30px 10px 0px 10px">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px">
                  <tr>
                    <td bgcolor="#ffcfd9" align="center" style=" padding: 30px 30px 30px 30px; border-radius: 8px 8px 8px 8px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px; ">
                      <h2 style=" font-size: 20px; font-weight: 400; color: #50393e; margin: 0; "> Precisa de ajuda?</h2>
                      <p style="margin: 0">
                        <a href="#" target="_blank" style="color: #ff6d8d">Estamos aqui para ajudar</a>
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px">
                  <tr>
                    <td bgcolor="#f4f4f4" align="center" style=" padding: 0px 30px 30px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px; ">
                      <br/>
                      <p style="margin: 0"> Se você não se cadastrou em nosso site, por favor ignore este e-mail.</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>`
    },
    err => {
      logger.error(`Failed to send ConfirmRegister email to ${to}`)
      if (err) {
        logger.error(`${err.name} - ${err.message}`)
        if (err.stack) logger.error(err.stack)
      }
    }
  )
}
