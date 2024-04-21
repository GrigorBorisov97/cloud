<?php

function buildNestedArray($paths) {
    $result = [];
    foreach ($paths as $path) {
        $parts = explode('/', $path);
        $temp = &$result;
        foreach ($parts as $part) {
            if (!isset($temp[$part])) {
                $temp[$part] = [];
            }
            $temp = &$temp[$part];
        }
    }
    return $result;
}

function convertToDesiredFormat($array) {
    $result = [];
    foreach ($array as $key => $value) {
        if (is_array($value)) {
            $childArray = convertToDesiredFormat($value);
            if (!empty($childArray)) {
                $result[] = array_merge([$key], $childArray);
            } else {
                $result[] = $key;
            }
        } else {
            $result[] = $value;
        }
    }
    return $result;
}

function generateNestedArray($paths) {
    $nestedArray = buildNestedArray($paths);
    return convertToDesiredFormat($nestedArray);
}