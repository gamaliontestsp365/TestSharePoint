using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TestSPAppWeb.Models
{
    public class PickerTermSetModel
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public bool IsOpenForTermCreation { get; set; }
        public string CustomSortOrder { get; set; }
        public List<PickerTermModel> Terms { get; set; }

        public List<PickerTermModel> FlatTerms { get; set; }
    }
}