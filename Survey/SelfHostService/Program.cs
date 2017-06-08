using DataService.Implementation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;
using System.Threading.Tasks;

namespace DataService.Implementation
{
    class Program
    {
        static void Main(string[] args)
        {
            // Step 1 Add a service endpoint.
            using (WebServiceHost selfHost = new WebServiceHost(typeof(SurveysService)))
            {
                try
                {
                    // Step 2 Start the service.
                    selfHost.Open();
                    Console.WriteLine("The service is ready.");
                    Console.WriteLine("Press <ENTER> to terminate service.");
                    Console.WriteLine();
                    Console.ReadLine();

                    // Close the ServiceHostBase to shutdown the service.
                    selfHost.Close();
                }
                catch (CommunicationException ce)
                {
                    Console.WriteLine("An exception occurred: {0}", ce.Message);
                    selfHost.Abort();
                }
            }
        }
    }
}
