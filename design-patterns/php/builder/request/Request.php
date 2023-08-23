<?php
// Request.php

namespace BigBoxCode\DesignPattern\Builder\Request;

use BigBoxCode\DesignPattern\Builder\Request\Builder;

enum RequestType {
    case GET;
    case POST;
    case PUT;
    case PATCH;
    case DELETE;
}

class Request {
    private string $url;
    private RequestType $type;
    private array $header = [];
    private array $body = [];

    public function __construct(Builder $builder) {
        $this->url = $builder->url;
        $this->type = $builder->type;
        $this->header = $builder->header;
        $this->body = $builder->body;
    }

    public function send(): void {
        echo "Sending Request...";
        echo "\n\nURL: " . $this->url;
        echo "\n\nType: " . print_r($this->type, true);
        echo "\n\nHeaders: " . print_r($this->header, true);
        echo "\n\nBody: " . print_r($this->body, true);

        // Write functional code to send request
    }

    public static function newBuilder(): Builder {
        return new Builder();
    }
}