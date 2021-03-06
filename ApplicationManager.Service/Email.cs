﻿using MailKit;
using MailKit.Net.Imap;
using MailKit.Search;
using MailKit.Security;
using System;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace ApplicationManager.Service
{
    // This class is used by the application to send email for account confirmation and password reset.
    // For more details see https://go.microsoft.com/fwlink/?LinkID=532713
    public class Email : IEmail
    {
        public Task<int> PaerserEmailAsync(string imapserv, string email, string password, string subject)
        {
            Task<int> test1 = null;


            using (var client = new ImapClient())
            {
                // Note: depending on your server, you might need to connect
                // on port 993 using SecureSocketOptions.SslOnConnect
                client.Connect("mail.akado-telecom.ru", 993, SecureSocketOptions.SslOnConnect);


                // Note: use your real username/password here...
                client.Authenticate("startultimus@akado-telecom.ru", "SnrQF5kX");

                // open the Inbox folder...
                client.Inbox.Open(FolderAccess.ReadOnly);

                // search the folder for new messages (aka recently
                // delivered messages that have not been read yet)
                var uids = client.Inbox.Search(SearchQuery.New);
                // uids = client.Inbox.Search(SearchQuery.SubjectContains("Заявка из метро"));
  
                // ...but maybe you mean unread messages? if so, use this query
                uids = client.Inbox.Search(SearchQuery.NotSeen);

                foreach (var uid in uids)
                {
                    var message = client.Inbox.GetMessage(uid);
                    string landin;//= "(\S+?)\s*=\s*(\S+)";
                    string datacreate;
                    string phoneNumber;
                    if (message.Subject == "Заявка из метро")
                    {
                       // Regex r = new Regex(@"(\S+?)\s*:\s*(\S+)");
                        var ItemRegex = new Regex(@"(\S+?)\s*:\s*(\S+)", RegexOptions.Compiled);
                        var OrderList = ItemRegex.Matches(message.TextBody)
                                            .Cast<Match>()
                                            .Select(m => new
                                            {
                                                Name = m.Groups[1].ToString(),
                                                Count = m.Groups[2].ToString()
                                            })
                                            .ToList();


                        //foreach (Match m in r.Matches(message.TextBody))
                        //{
                        //    landin = m.ToString();
                        //}
                        //string[] lines = message.TextBody.Split(new[] { "\r\n", "\r", "\n" }, StringSplitOptions.None);
                        //foreach (var str in lines)
                        //{

                        //    if (str.Contains("Лендинг:"))
                        //    {
                        //        var arr = str.Split(':');
                        //        landin = arr[1];
                        //    }
                        //    if (str.Contains("Дата создания:"))
                        //    {
                        //        var arr = str.Split(':');
                        //        datacreate = arr[1];
                        //    }
                        //    if (str.Contains("Введенный номер телефона:"))
                        //    {
                        //        var arr = str.Split(':');
                        //        phoneNumber = arr[1];
                        //    }

                        //}

                    }
     


                }

                test1 = Task.Run(() => uids.Count);
                // Console.WriteLine("You have {0} unread message(s).", uids.Count);

                client.Disconnect(true);
            }
            return test1;
        }

        public Task SendEmailAsync(string email, string subject, string message)
        {
            return Task.CompletedTask;
        }
    }

}
