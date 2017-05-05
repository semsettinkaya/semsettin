using Sybase.Data.AseClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace intranet.Altyapi
{
    public class SamyeliDB : IDisposable
    {
        protected virtual void Dispose(Boolean disposing)
        {
            if (disposing)
            {
                // There's no need to set zero empty values to fields 
                // id = 0;
                // name = String.Empty;
                // pass = String.Empty;

                //TODO: free your true resources here (usually IDisposable fields)
            }
        }

        public void Dispose()
        {
            Dispose(true);

            GC.SuppressFinalize(this);
        }

        public string Hata { get; set; }

        public  AseDataReader ExecuteReader(string sorgu, CommandType type, string sorgu_turu, string sorgu_kodu)
        {
            AseConnection con = new AseConnection("Data Source='192.168.23.130,4100'; User ID='sp_samyeli'; PWD='Atk759/!6HR'; Initial Catalog='SAMYELI'");
            AseCommand cmd = new AseCommand(sorgu, con);
            AseParameter p1 = new AseParameter("@sorgu_turu", AseDbType.Char, 1);
            AseParameter p2 = new AseParameter("@sorgu_kodu", AseDbType.Char, 12);
            p1.Value = sorgu_turu;
            p2.Value = sorgu_kodu;
            cmd.CommandType = type;
            cmd.Parameters.Add(p1);
            cmd.Parameters.Add(p2);


            try
            {

                if (con.State != ConnectionState.Open)
                    con.Open();
                return cmd.ExecuteReader(CommandBehavior.CloseConnection);
            }

            catch (AseException hata)
            {
                if (con.State != ConnectionState.Closed)
                    con.Close();
                Hata = hata.Message;
                cmd.Parameters.Clear();
                return null;
            }

        }


        public AseDataReader ExecuteReader(string sorgu, CommandType type)
        {
            AseConnection con = new AseConnection("Data Source='192.168.23.130,4100'; User ID='sp_samyeli'; PWD='Atk759/!6HR'; Initial Catalog='SAMYELI'");
            AseCommand cmd = new AseCommand(sorgu, con);
            cmd.CommandType = type;


            try
            {
                if (con.State != ConnectionState.Open)
                    con.Open();
                return cmd.ExecuteReader(CommandBehavior.CloseConnection);
            }
            catch (AseException hata)
            {
                if (con.State != ConnectionState.Closed)
                    con.Close();
                Hata = hata.Message;
                cmd.Parameters.Clear();
                return null;
            }
        }
    }
}