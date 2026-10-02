/// Supabase Configuration for Paatbari Mobile App
/// 
/// Replace the placeholder URL and Anon Key below with your actual project credentials
/// from your Supabase Dashboard: Settings -> API
class SupabaseConfig {
  /// Supabase Project URL (e.g. 'https://abcdefghijkl.supabase.co')
  static const String supabaseUrl = String.fromEnvironment(
    'SUPABASE_URL',
    defaultValue: 'https://your-project-id.supabase.co',
  );

  /// Supabase Anonymous Public Key (starts with eyJhbGci...)
  static const String supabaseAnonKey = String.fromEnvironment(
    'SUPABASE_ANON_KEY',
    defaultValue: 'your-anon-key-here',
  );

  /// Helper to check if credentials have been filled in
  static bool get isConfigured {
    return supabaseUrl.isNotEmpty &&
        supabaseAnonKey.isNotEmpty &&
        !supabaseUrl.contains('your-project-id') &&
        !supabaseAnonKey.contains('your-anon-key');
  }
}
