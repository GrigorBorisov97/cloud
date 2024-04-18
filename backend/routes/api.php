<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FolderController;
use App\Http\Controllers\FileController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/getFolders', [FolderController::class, 'getFolders']);
Route::get('/getInfo', [FolderController::class, 'getInfo']);

Route::post('/newFolder', [FolderController::class, 'newFolder']);
Route::delete('/deleteFolder', [FolderController::class, 'deleteFolder']);
Route::put('/renameFolder', [FolderController::class, 'renameFolder']);

Route::get('/getFile', [FileController::class, 'getFile']);
Route::post('/fileUpload', [FileController::class, 'fileUpload']);
Route::get('/fileDownload', [FileController::class, 'fileDownload']);
Route::delete('/deleteFile', [FileController::class, 'deleteFile']);
