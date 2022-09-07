package com.zipedoc.repository;

import com.amazonaws.AmazonClientException;
import com.amazonaws.AmazonServiceException;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.GetObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectSummary;
import com.zipedoc.service.DocumentService;
import com.zipedoc.service.dto.DocumentDataDTO;
import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;
import org.springframework.util.StreamUtils;

@Repository
public class S3Repository {

    private final AmazonS3 s3Client;
    private final String bucketName = "zcw-cohort8n3dot1";
    private final Logger logger = LoggerFactory.getLogger(DocumentService.class);

    public S3Repository() {
        this.s3Client = AmazonS3ClientBuilder.standard().withRegion(Regions.US_EAST_1).build();
    }

    public String uploadObject(DocumentDataDTO data) {
        s3Client.putObject(bucketName, data.getKey(), data.getData());
        return String.valueOf(s3Client.getUrl(bucketName, data.getKey()));
    }

    public List<S3ObjectSummary> listObjects() {
        return new ArrayList<>(s3Client.listObjectsV2(bucketName).getObjectSummaries());
    }

    // adapted from https://codeflex.co/java-read-amazon-s3-object-as-string/
    public String getS3ObjectContentAsString(String key) {
        try (InputStream is = s3Client.getObject(new GetObjectRequest(bucketName, key)).getObjectContent()) {
            return StreamUtils.copyToString(is, StandardCharsets.UTF_8);
        } catch (Exception e) {
            throw new IllegalStateException(e);
        }
    }

    public void deleteObject(String key) {
        s3Client.deleteObject(bucketName, key);
    }
}
