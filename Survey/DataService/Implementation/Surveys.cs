using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DataService.Interfaces;
using System.ServiceModel.Activation;

namespace DataService.Implementation
{

    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
    public class SurveysService : ISurvey
    {
        string ISurvey.GetData(int value)
        {
            return "GetData";
        }

        //CompositeType ISurvey.GetDataUsingDataContract(CompositeType composite)
        //{
        //    return new CompositeType();
        //}
    }
}