namespace backend.Utils
{
    public static class StrFormatter
    {
        public static string FormatStr(string str)
        {
            if (string.IsNullOrEmpty(str)) return str;

            return char.ToUpper(str[0]) + str.Substring(1).ToLower();
        }
    }
}