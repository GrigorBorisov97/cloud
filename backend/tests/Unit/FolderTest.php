<?php

namespace Tests\Unit;

use App\Http\Controllers\FolderController;
use Illuminate\Foundation\Testing\TestCase;
use Illuminate\Http\Request;

class FolderTest extends TestCase
{
    public function createApplication()
    {
        $app = require __DIR__.'/../../bootstrap/app.php';
        $app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();
        return $app;
    }

    public function testGetPath()
    {
        $controller = new FolderController();
        $expectedPath = storage_path('app/') . 'grigor' . '/';
        $this->assertEquals($expectedPath, $controller->getPath());
    }

    public function testGetFolders()
    {
        $request = new Request();

        $controller = new FolderController();
        $response = $controller->getFolders($request);
        
        $this->assertNotNull($response);
        
        $jsonResponse = json_encode($response);
        
        $this->assertJson($jsonResponse);
    }
    
    public function testGetInfo()
    {
        $request = new Request(['path' => 'root']);
        $controller = new FolderController();
        $response = $controller->getInfo($request);
    
        $this->assertJson($response->getContent());
    
        $decodedResponse = json_decode($response->getContent(), true);
    
        $this->assertArrayHasKey('files', $decodedResponse);
        $this->assertArrayHasKey('folder_size', $decodedResponse);
    }
}
