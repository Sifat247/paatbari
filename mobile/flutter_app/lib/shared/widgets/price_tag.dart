import 'package:flutter/material.dart';
import '../../core/theme/colors.dart';

class PriceTag extends StatelessWidget {
  final int amount;
  final int? compareAtAmount;
  final double fontSize;
  final bool isBangla;

  const PriceTag({
    super.key,
    required this.amount,
    this.compareAtAmount,
    this.fontSize = 16,
    this.isBangla = true,
  });

  static String toBanglaDigits(num value) {
    const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    final s = value.toString();
    final buffer = StringBuffer();
    for (int i = 0; i < s.length; i++) {
      final ch = s[i];
      final digit = int.tryParse(ch);
      if (digit != null) {
        buffer.write(bnDigits[digit]);
      } else {
        buffer.write(ch);
      }
    }
    return buffer.toString();
  }

  @override
  Widget build(BuildContext context) {
    final displayAmount = isBangla ? toBanglaDigits(amount) : amount.toString();

    return Row(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.baseline,
      textBaseline: TextBaseline.alphabetic,
      children: [
        Text(
          '৳$displayAmount',
          style: TextStyle(
            fontSize: fontSize,
            fontWeight: FontWeight.bold,
            color: AppColors.leaf,
          ),
        ),
        if (compareAtAmount != null && compareAtAmount! > amount) ...[
          const SizedBox(width: 6),
          Text(
            '৳${isBangla ? toBanglaDigits(compareAtAmount!) : compareAtAmount}',
            style: TextStyle(
              fontSize: fontSize * 0.8,
              decoration: TextDecoration.lineThrough,
              color: AppColors.inkLight,
            ),
          ),
        ],
      ],
    );
  }
}
