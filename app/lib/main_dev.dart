import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'core/theme/app_theme.dart';
import 'core/constants/api_endpoints.dart';
import 'routes/app_router.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  AppConfig.initialize(AppFlavor.dev);
  runApp(const ProviderScope(child: PaatbariApp()));
}

class PaatbariApp extends StatelessWidget {
  const PaatbariApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      title: 'Paatbari (Dev)',
      debugShowCheckedModeBanner: true,
      theme: AppTheme.lightTheme,
      routerConfig: appRouter,
    );
  }
}
