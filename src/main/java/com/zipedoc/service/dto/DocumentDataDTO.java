package com.zipedoc.service.dto;

public class DocumentDataDTO {

    private String key;
    private String data;

    public DocumentDataDTO() {}

    public DocumentDataDTO(String key, String data) {
        this.key = key;
        this.data = data;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }
}
