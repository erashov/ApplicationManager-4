using MailKit;
using MailKit.Net.Imap;
using MailKit.Search;
using MailKit.Security;
using System;
using System.Net;
using System.Net.Sockets;
using System.Threading.Tasks;

namespace ApplicationManager.Service
{
    // This class is used by the application to send email for account confirmation and password reset.
    // For more details see https://go.microsoft.com/fwlink/?LinkID=532713
    public class Email : IEmail
    {
        public Task<int> PaerserEmailAsync(string imapserv, string email, string password, string subject)
        {
            Task<int> test1=null;
  
          
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
                //uids = client.Inbox.Search(SearchQuery.SubjectContains("test"));
                // Console.WriteLine("You have {0} new message(s).", uids.Count);

                // ...but maybe you mean unread messages? if so, use this query
                uids = client.Inbox.Search(SearchQuery.NotSeen);
                foreach (var uid in uids)
                {
                    var message = client.Inbox.GetMessage(uid);
                    var text = message.TextBody;

     
                }

                test1 =Task.Run(()=> uids.Count);
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
