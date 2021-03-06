<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit76ada10284d2a4fa41cd5347321c8efc
{
    public static $prefixLengthsPsr4 = array (
        'W' => 
        array (
            'Workerman\\' => 10,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Workerman\\' => 
        array (
            0 => __DIR__ . '/..' . '/workerman/workerman',
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit76ada10284d2a4fa41cd5347321c8efc::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit76ada10284d2a4fa41cd5347321c8efc::$prefixDirsPsr4;

        }, null, ClassLoader::class);
    }
}
