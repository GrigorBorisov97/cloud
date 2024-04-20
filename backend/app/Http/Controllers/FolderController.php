<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FolderController extends Controller
{
    private $user;
    private $path;
    private $folder_structure;

    function __construct() {
        $this->user = 'grigor';
        $this->path = storage_path('app/') . $this->user;
        $this->folder_structure = [];
    }


    /**
     * Get folder structure
     * @access public
     * @author Grigor Borisov
     * @return nested array
     */

    public function getPath()
    {
        return $this->path . '/';
    }
    
    public function getFolders()
    {
        $folders = $this->cleanFolder($this->path);
        $this->foldersCrawler($folders, $this->path . '/');
        
        return response()->json($this->convertPathToArray($this->folder_structure));
    }

    public function getInfo(Request $request)
    {
        function dirSize($directory) {
            $size = 0;
            foreach(new \RecursiveIteratorIterator(new \RecursiveDirectoryIterator($directory)) as $file){
                $name = $file->getFilename();

                if ($name !== '..') {
                    $size+=$file->getSize();
                }
            }
            return $size;
        }

        function convertSize($size) {
            if ($size <= 4096) return 'Empty';
            else if ($size <= 1048576) return round($size / 1024) . 'KB';
            else if ($size <= 1073741824) return round($size / 1024 / 1024) . 'MB';
        }
        
        $path = $this->path . '/' . $request->input('path');
        $size = dirSize($path);
        $formated_size = convertSize($size);

        $scan = scandir($path);
        $files = [];

        foreach ($scan as $elem) {
            $is_folder = is_dir($path . '/' . $elem);

            if (!$is_folder) {
                $files[] = $elem;
            }
        }
        
        return response()->json([
            'files' => $files,
            'folder_size' => $formated_size
        ]);
    }

    /**
     * Get folder structure
     * @access public
     * @author Grigor Borisov
     * @param nested array
     * @return nested array
     */
    private function foldersCrawler($folders, $path, $init = 5)
    {
        foreach ($folders as $folder) {
            $tmp_path = $path . $folder;
            $cut_path = str_replace($this->path . '/', '', $tmp_path);
            $cut_path_array = explode('/', $cut_path);
            $childs = $this->cleanFolder($tmp_path);
            $fol = explode('/', $tmp_path)[$init];

            $this->folder_structure[] = $cut_path;
            if (!empty($childs)) {
                $this->foldersCrawler($childs, $tmp_path . '/', $init + 1);
                // $this->folder_structure[] = $tmp_p;
            } else {

            }
        }
    }

    private function cleanFolder($path)
    {
        // echo $path;
        // echo '<br />';
        $tmp_path = scandir($path);
        $folders = array_filter($tmp_path, function($v, $k) use($path) {
            $is_folder = is_dir($path . '/' . $v);
            return $v !== '.' && $v !== '..' && $is_folder;
        }, ARRAY_FILTER_USE_BOTH);
        
        return array_values($folders);
    }

    public function convertPathToArray($paths)
    {
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

        $desiredArray = generateNestedArray($paths);
        return $desiredArray;
    }

    public function newFolder(Request $request)
    {
        $path = $this->path . '/' . $request->input('path');
        $folder_name = $request->input('name');

        mkdir($path . '/' . $folder_name, 0777, false);
        
        echo json_encode(['status' => 'success']);
    }

    public function deleteFolder(Request $request)
    {
        $path = $this->path . '/' . $request->input('path');

        rmdir($path);
        echo json_encode(['status' => 'success']);
    }

    public function renameFolder(Request $request)
    {
        $path = $this->path . '/' . $request->input('path');

        $path_arr = explode('/', $path);
        array_pop($path_arr);
        $new_path = implode('/', $path_arr) . '/' .$request->input('name');
        
        rename($path, $new_path);
        echo json_encode(['status' => 'success']);
    }
}
