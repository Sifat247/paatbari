import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'core/theme/app_theme.dart';
import 'core/constants/api_endpoints.dart';
import 'core/supabase/supabase_service.dart';
import 'routes/app_router.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  AppConfig.initialize(AppFlavor.prod);
  await SupabaseService.instance.initialize();
  runApp(const ProviderScope(child: PaatbariApp()));
}

class PaatbariApp extends StatelessWidget {
  const PaatbariApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      title: 'Paatbari · পাটবাড়ি',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme,
      routerConfig: appRouter,
    );
  }
}
