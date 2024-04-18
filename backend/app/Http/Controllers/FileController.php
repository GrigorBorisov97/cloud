<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\FolderController;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    private $path;

    function __construct(FolderController $folder)
    {
        $this->path = $folder->getPath();
    }

    public function fileUpload(Request $request)
    {
        $path = str_replace('/app/storage/app/', '', $this->path . $request->input('path'));
        $files = $request->file('files');

        foreach ($files as $file) {
            $originalName = $file->getClientOriginalName();            
            $storedPath = $file->storeAs($path, $originalName);
            $url = Storage::url($storedPath);
        }

        echo json_encode([
            'status' => 'success'
        ]);
    }

    public function fileDownload(Request $request)
    {
        $file = $this->path . $request->input('path');
        $file_path_arr = explode('/', $file);
        $filename = array_pop($file_path_arr);
        
        return response()->download($file, $filename, [
            'Content-Type' => 'application/octet-stream',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
            'Access-Control-Expose-Headers' => 'Content-Disposition'
        ]);
    }

    public function deleteFile(Request $request)
    {
        $file = $this->path . $request->input('path');
        if (unlink($file)) {
            echo json_encode([
                'status' => 'success'
            ]);
        } else {
            echo json_encode([
                'status' => 'failed'
            ]);
        }   
    }

    public function getFile(Request $request)
    {
        $file = $this->path . $request->input('filePath');
        $file_split = explode('.', $file);
        $extension = '.' . end($file_split);

        if (in_array($extension, [".txt", ".csv", ".html", ".xml", ".json", ".md", ".log"])) {
            header("Content-Type: image/png");

            echo json_encode([
                'status' => 'success',
                'file' => readfile($file)
            ]);
        } else if (in_array($extension, [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".tiff", ".tif", ".svg", ".webp"])) {
            return response()->file($file);
        }
    }
}
