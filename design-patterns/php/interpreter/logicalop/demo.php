<?php
// demo.php

require __DIR__ . '/../../vendor/autoload.php';

use BigBoxCode\DesignPattern\Interpreter\LogicalOp\AndOperation;
use BigBoxCode\DesignPattern\Interpreter\LogicalOp\OrOperation;
use BigBoxCode\DesignPattern\Interpreter\LogicalOp\TerminalOperation;
use BigBoxCode\DesignPattern\Interpreter\LogicalOp\XorOperation;


$op1 = new TerminalOperation("Big");
$op2 = new TerminalOperation("Box");

$andChecker = new AndOperation($op1, $op2);
$orChecker = new OrOperation($op1, $op2);
$xorChecker = new XorOperation($op1, $op2);

$checkStr1 = "Big Box Code";
$checkStr2 = "Only Big Code";
$checkStr3 = "Only Box Code";
$checkStr4 = "No Code";

$andResult1 = $andChecker->execute($checkStr1);
$andResult2 = $andChecker->execute($checkStr2);
$andResult3 = $andChecker->execute($checkStr3);
$andResult4 = $andChecker->execute($checkStr4);

echo "Data: " . $checkStr1 . "; AND Result: " . var_export($andResult1, true) . "\n";
echo "Data: " . $checkStr2 . "; AND Result: " . var_export($andResult2, true) . "\n";
echo "Data: " . $checkStr3 . "; AND Result: " . var_export($andResult3, true) . "\n";
echo "Data: " . $checkStr4 . "; AND Result: " . var_export($andResult4, true) . "\n";

$orResult1 = $orChecker->execute($checkStr1);
$orResult2 = $orChecker->execute($checkStr2);
$orResult3 = $orChecker->execute($checkStr3);
$orResult4 = $orChecker->execute($checkStr4);

echo "Data: " . $checkStr1 . "; OR Result: " . var_export($orResult1, true) . "\n";
echo "Data: " . $checkStr2 . "; OR Result: " . var_export($orResult2, true) . "\n";
echo "Data: " . $checkStr3 . "; OR Result: " . var_export($orResult3, true) . "\n";
echo "Data: " . $checkStr4 . "; OR Result: " . var_export($orResult4, true) . "\n";

$xorResult1 = $xorChecker->execute($checkStr1);
$xorResult2 = $xorChecker->execute($checkStr2);
$xorResult3 = $xorChecker->execute($checkStr3);
$xorResult4 = $xorChecker->execute($checkStr4);

echo "Data: " . $checkStr1 . "; XOR Result: " . var_export($xorResult1, true) . "\n";
echo "Data: " . $checkStr2 . "; XOR Result: " . var_export($xorResult2, true) . "\n";
echo "Data: " . $checkStr3 . "; XOR Result: " . var_export($xorResult3, true) . "\n";
echo "Data: " . $checkStr4 . "; XOR Result: " . var_export($xorResult4, true) . "\n";

